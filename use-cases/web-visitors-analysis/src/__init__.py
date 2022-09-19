
import seaborn as sns
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from pandas.plotting import autocorrelation_plot
from statsmodels.tsa.arima.model import ARIMA


import pandas as pd
pd.set_option('display.width', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.float_format', '{:,.2f}'.format)

plot_path = lambda plot_name: f"./output/{plot_name}.png"
title = lambda x: x.replace("-", " ").title()


## Setup variables
ycols = ['revenue', 'landing_pageviews', 'checkout_pageviews', 'thankyou_pageviews']
dims = ["device", "landing_page"]
date = ["date"]

