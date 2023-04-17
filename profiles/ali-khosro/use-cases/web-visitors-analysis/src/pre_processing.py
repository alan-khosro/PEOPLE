
from __init__ import pd, dims, ycols, date

print('''## Important KPIs
After cleaning up our dataset, we define the main KPIs that we need to monitor over time.
- Revenue Rate KPIs:
    - **revenue per landing**
    - revenue per checkout
    - **revenue per thankyou**
- Conversion Rate KPIs:
    - **landing to checkout conversion rate**
    - **checkout to thankyou conversion rate**
- Page View KPIs:
	- **pageviews for each landing page**
	- pageviews for thank you page
	- pageviews for checkout page
- Revenue KPIs:
	- **Total Revenue**
	- **Revenue by device and landing_page**
	- Total Revenue by weekday

It is important to track above important KPIs by device and by landing page
''')


df = pd.read_csv("input.csv", parse_dates=["date"])
df.columns = df.columns.str.strip()
df = df[["date", "device", "landing_page", "landing_pageviews", "checkout_pageviews", "thankyou_pageviews", "revenue"]]


df.dtypes
df["revenue"] = df["revenue"].str.replace(r'[\D.]', '', regex=True).astype("float")
df["date"] = pd.to_datetime(df["date"])
df["device"] = df["device"].str.strip()
df["landing_page"] = df["landing_page"].str.strip()

df.describe()


## Define KPIs

df["revenue_per_landing"] = df["revenue"]/df["landing_pageviews"]
df["revenue_per_checkout"] = df["revenue"]/df["checkout_pageviews"]
df["revenue_per_thankyou"] = df["revenue"]/df["thankyou_pageviews"]

df["checkout_conversion"] = df["checkout_pageviews"]/df["landing_pageviews"]
df["thankyou_conversion"] = df["thankyou_pageviews"]/df["checkout_pageviews"]


## create total revenue
df = df.sort_values(dims+date).set_index(date)
df_total = df.groupby(date)[ycols].sum()



df_summary = df.groupby(["device", "landing_page"]).mean()

print(f'''
### Dataset Summary:
```
{df.describe()}
```
''')

print(f'''### Summary By Dimensions
Let us look at the aggregated average by device and landing page:
```
{df_summary}
```

### Highlighted Observations
We notice the following important observations:
> - Conversion Rates from landing to checkout (about 15%) and from checkout to thankyou (about 20%) are similar among all groups
> - Page visits are similar among all groups
> - Revenue from Desktop are much higher than revenue from Mobile (about 5 time higher)
> - The revenue rates similarly are about 5 times higher for the Desktop visits

''')
