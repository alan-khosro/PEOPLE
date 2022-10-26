
print('''## Moving Average Analysis
Since we have weekday seasonality, it is intuitive to use 7-days moving average of revenue for predictions.
''')

from __init__ import plt, plot_path, title, ycols, dims, date
from pre_processing import df, df_total

## create Moving Average Dataset
ma = df.groupby(dims).rolling(window="7d", min_periods=1)[ycols].mean().reset_index(dims)
ma_total = ma.groupby(date)[ycols].sum()


plot_name="decompose-revenue"

fluctuations = df_total['revenue'] - ma_total['revenue']
fig, ax = plt.subplots()
df_total['revenue'].plot(alpha=.5, label="revenue")
ma_total['revenue'].plot(label="7-days moving average")
fluctuations.plot(label="remaining revenue")
plt.axhline(y=0)
plt.legend()
plt.title(title(plot_name))
plt.savefig(plot_path(plot_name))


print(f'''### Decompose Revenue Components
Before jumping into prediction, it is useful to look at the total revenue, its moving average, and its fluctuations in one graph.
![demopose revenue]({plot_name}.png)

We notice two important points about this transformation
> - 7-days moving average seems to smooth out the revenue and remove seasonality and noise very well
- It appears to be a downward drift in our moving average revenue
We will explore the second observation before predicting next month revenue 

''')


plot_name = "revenue-components"


fig, ax2 = plt.subplots()

# for key,grp in df.groupby(["device", "landing_page"]):
#     grp['revenue'].plot(ax=ax1, label=key)

# df_total['revenue'].plot(ax=ax1, label="total revenue")
# ax1.set_title("Revenue by Device and Landing Page")


for key,grp in ma.groupby(["device", "landing_page"]):
    grp['revenue'].plot(ax=ax2, label=key)

ma_total['revenue'].plot(ax=ax2, label="total revenue")
ax2.set_title("Smooth Revenue (7 days Moving Average)")

ax2.legend(loc="best", bbox_to_anchor=(1,1))
fig.savefig(plot_path(plot_name), bbox_inches="tight")



print(f'''### No Trend In Reveneue Components
We can investigate revenue components (by device and landing page) to see if there is a downward trend in any of the components.

The upper plots the raw revenue and the lower plots the smooth revenue (7-days moving average revenue) by device and landing page alongside the total revenue for each day.
![Revenue Components]({plot_name}.png)

While the total revenue shows a slight downward trend (drift), its components shows no trend, only occasional drops. In second week of February we see a drop in revenue for Mobile devices.

> There is no persistent trend (drift) in revenue, only occasional drops in the past especially for the Mobile visits in the second week of February.

''')

