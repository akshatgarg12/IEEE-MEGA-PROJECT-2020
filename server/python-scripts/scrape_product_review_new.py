import math
import json
from concurrent.futures import ThreadPoolExecutor
from selenium import webdriver
import threading
import numpy as np
from bs4 import BeautifulSoup
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait 
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
import sys
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer 


options = webdriver.ChromeOptions()
options.add_argument("--ignore-certificate-errors")
options.add_argument("--incognito")
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
threadLocal = threading.local()

def get_driver():
  driver = getattr(threadLocal, 'driver', None)
  if driver is None:
    driver = webdriver.Chrome(options=options)
    setattr(threadLocal, 'driver', driver)
  return driver


reviews=[]
def get_ct(soup):
    review_ctr=soup.findAll('div',{'data-hook':'cr-filter-info-review-rating-count','class':'a-row a-spacing-base a-size-base'})
    counter=review_ctr[0].getText()
    clen_ctr=counter.split()
    idex=clen_ctr.index('|')
    ct=clen_ctr[idex+1]
    numero=ct.split(',')
    new_ct=''
    for i in numero:
        new_ct+=i
    return int(new_ct)

def get_reviews(URL):
    driver=get_driver()
    driver.get(URL)
    WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR,".review-data")))
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'lxml')
    spans = soup.find_all('span',{'data-hook':'review-body','class':'a-size-base review-text review-text-content'})
    for span in spans:
        if span.get_text():
            reviews.append(span.get_text());
  


def set_up_threads(urls, cores):
    with ThreadPoolExecutor(max_workers=cores) as executor:
        executor.map(get_reviews, review_pgs, timeout=60)


review_pgs=[]
def process_reviews(base_url,max_ct):
    adder='&pageNumber='
    pg=1
    page_ct=math.ceil(max_ct/10.0)
    if page_ct>100:
        page_ct=100
    for i in range(page_ct):
        review_pgs.append(base_url+adder+str(pg))
        pg+=1
    set_up_threads(review_pgs, 4)

def prime_scraper(URL):
    ignored_exceptions=(NoSuchElementException,StaleElementReferenceException)
    
    driver=get_driver()
    try:
        driver.get(URL)
        see_all_reviews = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CSS_SELECTOR,"#reviews-medley-footer .a-text-bold")))
        product_title = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CSS_SELECTOR,"#productTitle")));
        product_title = product_title.text
        product_image = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CSS_SELECTOR,"#landingImage")));
        product_image = product_image.get_attribute('src')
        see_all_reviews.click();
        soup=BeautifulSoup(driver.page_source,'lxml')
        base_url=driver.current_url
        rev_ct=get_ct(soup)
        driver = get_driver()
        process_reviews(base_url,rev_ct)
    except:
        error = json.dumps({
         "error":"invalid url"
        })
        print(error)
        driver.quit()
        sys.exit()
        driver.quit()
        sys.exit()
        return 0
    driver.quit()
    largest_review = ""
    for r in reviews:
        if len(r) > len(largest_review):
            largest_review = r
    
    classifier=SentimentIntensityAnalyzer()

    positive = 0;
    negative = 0;
    neutral = 0;

    for i in range(len(reviews)):
      sentiment=classifier.polarity_scores(reviews[i])
      # print(sentiment);
      positive = positive + sentiment['pos'];
      negative = negative + sentiment['neg'];
      neutral = neutral + sentiment['neu'];
  
    positive = (positive*100)/len(reviews);
    negative = (negative*100)/len(reviews);
    neutral = (neutral*100)/len(reviews);


    final_data = {
        "title":product_title,
        "img":product_image,
        "total_reviews":len(reviews),
        "largest_review":largest_review,
        "score":[   
          {
            "title":"negative",
            "text":"negative sentiments",
            "color":"danger",
            "value":negative
          },
          {
            "title":"positive",
            "text":"positive sentiments",
            "color":"success",
            "value":positive
          },
          {
            "title":"neutral",
            "text":"neutral sentiments",
            "color":"info",
            "value":neutral
          }
      ]
    }

    final_data_json = json.dumps(final_data)
    print(final_data_json);
        


URL=sys.argv[1];

prime_scraper(URL);

sys.exit();

