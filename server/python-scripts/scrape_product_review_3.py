from bs4 import BeautifulSoup
import requests
import json
import math
import nltk
from nltk import word_tokenize
from nltk.corpus import stopwords	
from nltk.probability import FreqDist	
import sys
import json
from concurrent.futures import ThreadPoolExecutor
from selectorlib import Extractor
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer 



def request_generator(url):
    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64;     x64; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept-Encoding":"gzip, deflate",     "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}
    r = requests.get(url, headers=headers)
    if r.status_code > 500:
        if "To discuss automated access to Amazon data please contact" in r.text:
        	error = json.dumps({
	         "error":"invalid url"
	        })
	        print(error)
	        driver.quit()
	        sys.exit()
        else:
        	error = json.dumps({
	         "error":"invalid url"
	        })
	        print(error)
	        driver.quit()
	        sys.exit()
        return None
    return r



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

reviews=[]


def get_reviews(URL):
    r=request_generator(URL)
    soup = BeautifulSoup(r.text, 'lxml')
    spans = soup.find_all('span',{'data-hook':'review-body','class':'a-size-base review-text review-text-content'})
    for span in spans:
        if span.get_text():
            reviews.append(span.get_text())

def set_up_threads(urls, cores):
    with ThreadPoolExecutor(max_workers=cores) as executor:
        executor.map(get_reviews, review_pgs, timeout=60)

review_pgs=[]


def process_reviews(base_url,max_ct):
    adder='&pageNumber='
    pg=1
    page_ct=math.floor(max_ct/10)
    if page_ct>100:
        page_ct=100
    for i in range(page_ct):
        review_pgs.append(base_url+adder+str(pg))
        pg+=1
    set_up_threads(review_pgs, 4)


def prime_scraper(URL):
    r=request_generator(URL)

    if r==None:
        error = json.dumps({
         "error":"invalid url"
        })
        print(error)
        driver.quit()
        sys.exit()

    ex=Extractor.from_yaml_file('python-scripts/Product_Page.yml')
    file=ex.extract(r.text)
    product_title=file['name']
    product_image=file['images'].split('"')[1]
    base_url='https://www.amazon.in'
    base_url+=file['rev_link']
    r=request_generator(base_url)
    soup=BeautifulSoup(r.text,'lxml')
    rev_ct=get_ct(soup)
    process_reviews(base_url, rev_ct)
    
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
    print(final_data_json)

URL = sys.argv[1]
prime_scraper(URL)