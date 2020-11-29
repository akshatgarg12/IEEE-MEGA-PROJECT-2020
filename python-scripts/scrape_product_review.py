import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait 
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
import numpy as np
import nltk
from nltk import word_tokenize
from nltk.corpus import stopwords	
from nltk.probability import FreqDist	
import sys
import json
import pandas as pd
ignored_exceptions=(NoSuchElementException,StaleElementReferenceException)
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer 


# URL=input("Enter a valid URL of the product homepage Amazon:");
URL=sys.argv[1]
chrome_options=webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
driver = webdriver.Chrome('chromedriver',options=chrome_options)



try:
	driver.get(URL)
	see_all_reviews = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CSS_SELECTOR,"#reviews-medley-footer .a-text-bold")))
	product_title = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CSS_SELECTOR,"#productTitle")));
	product_title = product_title.text
	product_image = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CSS_SELECTOR,"#landingImage")));
	product_image = product_image.get_attribute('src')
	see_all_reviews.click();
except:
	print("Invalid URL")
	driver.quit()
	sys.exit()

reviews = []
while True and driver:
  try:
    WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR,".review-text-content")))
    page_source=driver.page_source
    soup=BeautifulSoup(page_source,'lxml')
    spans=soup.find_all('span',{'data-hook':'review-body','class':'a-size-base review-text review-text-content'})
    if len(spans)==0:
      continue
    for i in range(len(spans)):
      reviews.append(spans[i].getText())
    if len(reviews)>1000:
      break
    try:
      next_page=WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CSS_SELECTOR,'#cm_cr-pagination_bar>ul>li.a-last>a')))
      next_page.click()
    except StaleElementReferenceException:
      pass
  except TimeoutException:
    break
driver.quit()




def remove_emoji(string):
    emoji_pattern = re.compile("["
                           u"\U0001F600-\U0001F64F" 
                           u"\U0001F300-\U0001F5FF"  
                           u"\U0001F680-\U0001F6FF"  
                           u"\U0001F1E0-\U0001F1FF"  
                           u"\U00002702-\U000027B0"
                           u"\U000024C2-\U0001F251"
                           "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', string)



for i in range(len(reviews)):
  reviews[i]=remove_emoji(reviews[i])




review_string = ''
clean_reviews=[]
# converting all the relevant reviews to a single string
for i in range(len(reviews)):
	if i%2:
		clean_reviews.append(reviews[i].lower())
		review_string = " ".join([review_string, reviews[i].lower()]) 


# tokenizing words	
words = word_tokenize(review_string)

clean_words = []

stopwords = stopwords.words("english")

# cleaning data from stopwords and non alphabets
for w in words:
	if w.isalpha() and w not in stopwords:
		clean_words.append(w)

# frequency distribution of words
fdist = FreqDist(clean_words)

# print(fdist.most_common(10))

largest_review = ""
for r in clean_reviews:
	if len(r) > len(largest_review):
		largest_review = r




classifier=SentimentIntensityAnalyzer()

positive = 0;
negative = 0;
neutral = 0;

for i in range(len(clean_reviews)):
  sentiment=classifier.polarity_scores(clean_reviews[i])
  # print(sentiment);
  positive = positive + sentiment['pos'];
  negative = negative + sentiment['neg'];
  neutral = neutral + sentiment['neu'];
  
positive = (positive*100)/len(clean_reviews);
negative = (negative*100)/len(clean_reviews);
neutral = (neutral*100)/len(clean_reviews);

final_data = {
	"product_title":product_title,
	"product_image":product_image,
	"total_reviews":len(clean_reviews),
	"words_frequency":fdist.most_common(10),
  "positive_sentiment":positive,
  "negative_sentiment":negative,
  "neutral_sentiment":neutral
}

final_data_json = json.dumps(final_data)

print(final_data_json);



