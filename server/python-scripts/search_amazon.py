from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait 
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import TimeoutException
from selectorlib import Extractor
import requests
import json
import sys

user_input = sys.argv[1];

# chrome options
chrome_options=webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
# driver constructor
driver = webdriver.Chrome('chromedriver',options=chrome_options)

# getting the input of product to look for on amazon by user

url_list = []

# this function will search the word in the search bar and will scrape top 10 urls.
def search_amazon(item):
    #  getting the homepage of amazon
    driver.get("https://www.amazon.in/")
    # searching for the product
    search_box = driver.find_element_by_id('twotabsearchtextbox').send_keys(item)
    search_button = driver.find_element_by_id("nav-search-submit-text").click()
    driver.implicitly_wait(5)
    # looking for the paginate element to navigate to next page
    try:
        num_page = driver.find_element_by_xpath('//*[@class="a-pagination"]/li[6]')
    except NoSuchElementException:
        num_page = driver.find_element_by_class_name('a-last').click()

    driver.implicitly_wait(3)

    for i in range(1):
        page_ = i + 1
        url_list.append(driver.current_url)
        driver.implicitly_wait(4)
        click_next = driver.find_element_by_class_name('a-last').click()    
    driver.quit()


def scrape(url):
    # extractor initialised
    e = Extractor.from_yaml_file('python-scripts/search_results.yml')
	# headers to send with get request.
    headers = {
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://www.amazon.in/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }
    # get request made to the url
    r = requests.get(url, headers=headers)
    # if the request is denied
    if r.status_code > 500:
        error = json.dumps({
        "error":"invalid url"
        })
        print(error)

    return e.extract(r.text)




data_extracted = []

# calling the fn
search_amazon(user_input)


for url in url_list:
    data = scrape(url)
    if data:
        for product in data['products']:
            product['search_url'] = url
            data_extracted.append(product)
            

products = json.dumps(data_extracted)
print(products);        

