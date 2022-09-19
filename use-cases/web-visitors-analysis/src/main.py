


print('''# Internet Brands Use Case Analysis
Author: Ali Khosro

- [Executive Summary](#executive-summary)
- [Important KPIs](#important-kpis)
- [Priliminary Analysis](#priliminary-analysis)
- [Moving Average Analysis](#moving-average-analysis)
- [Forecast Next Month](#forecast-next-month-revenue)
- [Attachment](#attachment-arima-selection)


## Executive Summary
### Data Summary
- Conversion Rates from landing to checkout **about 15%** and from checkout to thankyou **about 20%** are similar among all groups
- Page visits are similar among all groups (about **1300 pageviews per day**)
- Revenue from **Desktop revenue contribute to 85%** of the total revenue. Total daily revenue is about **2700** dollars.
- The revenue rates similarly are about 5 times higher for the Desktop visits (about **95 cents** for each Desktop visit and **16 cents** for each Mobile visit)

### Trends
- January daily revenue is only 4% higher than February but since February had 28 days and January had 31 days, the total monthly revenue gap seems higher 13% lower.
- Sundays have higher revenue and Saturdays have lower revenue than weekdays.
- There has been a significant drop especially for the Mobile visits after the second week of February. It is not a trend, just a drop.
- However, a drop in visits did **not** reduce the total revenue significantly since most such visits seem to not have been converted to shopping.
- **There is no persistent trend (drift) in revenue**, only occasional up and downs in the past especially a drop for the Mobile visits in the second week of February.

### Forecast
- 7-days moving average seems to smooth out the revenue and remove seasonality and noise very well
- The latest 7-day moving average of revenue is a very good predictor for future revenues.
- For March, average revenue forecast is **$76411** and with 95% confidence it would be between **70012 and 82810**

### KPIs to monitor
The following KPIs based on **7-days moving average** are crucial to monitor on a dashboard drilled down by device and landing_page to detect changes and trends:
- Total Revenue
- Revenue by device and landing_page
- revenue per landing
- revenue per thankyou
- landing to checkout conversion rate
- checkout to thankyou conversion rate
- pageviews for each landing page

''')


print('''## Data Science Report
- Input dataset: revenue and site visit data for Jan and Feb 2017
- Analysis Questions:
    - we are seeing lower revenue for Feb 2017, is it a valid concern?
    - predict March 2017 revenue
    - what other insights and suggestions can you extract?
    - What KPIs would you suggest to monitor?
- Sections:
    - Executive Summary
    - Detailed Analysis
- Process Flow
```mermaid
flowchart LR

homepage & product -->
checkout -->
thankyou
```

''')


from __init__ import pd, np, sns, plt, plot_path, title, ycols, dims, date, autocorrelation_plot, ARIMA

from pre_processing import df, df_total

import preliminary_analysis

from moving_average_analysis import ma_total

import predict_revenue

import arima_selection

