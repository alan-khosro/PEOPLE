
print('''## Priliminary Analysis''')

from __init__ import sns, plt, plot_path, title

from pre_processing import df, df_total



## revenue by month

### plot revenue by month for total revenue and daily average revenue

plot_name = "revenue-by-month"

fig, (ax1, ax2) = plt.subplots(2, sharex=True)
months = df_total.index.month_name()
daily_revenue_by_month = df_total['revenue'].groupby(months, sort=False).mean()
total_revenue_by_month = df_total['revenue'].groupby(months, sort=False).sum()
daily_revenue_by_month.plot(kind="bar", ax=ax1)
total_revenue_by_month.plot(kind="bar", ax=ax2)
ax1.set_title("Daily Revenue by Month")
ax2.set_title("Total Revenue by Month")
fig.savefig(plot_path(plot_name), bbox_inches="tight")

print(f'''### February Revenue vs January Revenue
Is lower February revenue a valid concern?
The following graph shows the average daily revenue in February is not much lower than January revenue. 
![Revenue by month](./{plot_name}.png)
> January daily revenue is only 4% higher than February but since February had 28 days and January had 31 days, the total monthly revenue gap seems higher 13% lower.
''')


### weekday seasonality

plot_name = "revenue-by-weekday"

weekdays = df_total.index.day_name()
fig, ax = plt.subplots()
sns.boxplot(y=df_total['revenue'], x=weekdays)
ax.set(xlabel="weekday")
ax.set_title(title(plot_name))
fig.savefig(plot_path(plot_name))

print(f'''### Weekday Seasonality
Our data has weekday seasonality that is shown in the below graph.

![revenue by weekday]({plot_name}.png)

As we see in the picture the revenue by weekday is different. For example, 
> Sundays have higher revenue and Saturdays have lower revenue than weekdays.
Since our prediction is not for a specific day but rather for a month, we can remove the seasonality by 7-days moving averge to achieve a smooth revenue that is easier to predict.
''')

