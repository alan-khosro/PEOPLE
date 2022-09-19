

from __init__ import pd, plt, plot_path, title, ARIMA

from pre_processing import df_total

from moving_average_analysis import ma_total
import math


print('''## Forecast Next Month Revenue
''')

## predict revenue using insight

ma_diff_pct = ma_total['revenue'].diff()/ma_total['revenue']
std = ma_diff_pct.std()

time_sqroot = sum([math.sqrt(t) for t in range(32)])

next_month_se = time_sqroot * std
latest_revenue = ma_total['revenue'].iloc[-1]

next_month_revenue_mean = 31 * latest_revenue
next_month_revenue_lower = next_month_revenue_mean - 2 * (latest_revenue * next_month_se)
next_month_revenue_upper = next_month_revenue_mean + 2* (latest_revenue * next_month_se)

print(f'''### Forecast Revenue By Theoretical Insight
The underlying hypothesis for using the latest (moving average) observation is that our (revenue) observations follow a Markov Process, very much like what we observe in the stock market: while there might be a trend in the past prices, yet the latest observation is the most reliable prediction for future (efficient market hypothesis in economics).
The confidence interval can be calculated easily by knowing that standard deviation is a square root of time multiply daily standard deviation.

> mean revenue prediction: **{next_month_revenue_mean:.0f}**
> lower (95%) revenue prediction: **{next_month_revenue_lower:.0f}**
> upper revenue prediction: **{next_month_revenue_upper:.0f}**

''')


## prediction by bootstrapping

sim_diff = ma_total['revenue'].diff().dropna()
drift = sim_diff.sum()/len(sim_diff)
sim_diff = sim_diff - drift

latest_rev = ma_total['revenue'].iloc[-1]

date_range = pd.date_range("2017-03-01", "2017-04-01", inclusive="left")
n = len(date_range)

simulations = []
for i in range(1000):
    rev = sim_diff.sample(n, replace=True).cumsum() + latest_rev
    rev.index = date_range
    simulations.append(rev)

plot_name="revenue-prediction-by-bootstrapping"

fig, ax = plt.subplots()

df_total['revenue'].plot(ax=ax, alpha=.4)
ma_total['revenue'].plot(ax=ax)

for i in range(1000):
    simulations[i].plot(ax=ax, color="black", alpha=0.05)

plt.title(title(plot_name))
ax.set_ylim(bottom=0)
plt.savefig(plot_path(plot_name), bbox_inches='tight')

sums = [sum(simulation) for simulation in simulations]
sums.sort()

ci = [sums[i] for i in [25, 500, 975]]

print(f'''### Forecast Revenue Through Bootstrapping
I am a big fan of using [bootstrapping](https://en.wikipedia.org/wiki/Bootstrapping_(statistics)) method. Let us use this method with 7-days moving average to predict next month revenue. First we remove the drift so we can draw from the past observations. Then we simulate the predictions 1000 times, each time we draw the past change of smooth revenue.
![bootstrap prediction]({plot_name}.png)

> Next month revenue is **{ci[1]:.0f}** with 95% probability it will be between **{ci[0]:.0f}** and **{ci[2]:.0f}**
''')


## Revenue Prediction By ARIMA

model = ARIMA(ma_total['revenue'], freq='D', order=(1,1,0))
model_fit = model.fit()


z = model_fit.get_forecast(31, alpha=0.05)  # 95% conf
predict = pd.DataFrame()
predict['mean'] = z.predicted_mean
predict['lower'] = z.predicted_mean - z.se_mean
predict['upper'] = z.predicted_mean + z.se_mean

plot_name = "ARIMA-forecast-for-smooth-revenue"

fig, ax = plt.subplots()
ma_total['revenue'].plot(ax=ax)
predict['mean'].plot(ax=ax)
plt.fill_between(predict['mean'].index, predict['lower'], predict['upper'], 
                 color='k', alpha=.15)
plt.title('Revenue Forecast for March using ARIMA(1,1,0) for Smooth Revenue')
ax.set_ylim(bottom=0)
plt.savefig(plot_path(plot_name), bbox_inches="tight")

print(f'''### Forecast Revenu Using ARIMA For Smooth Revenue
From insight we can conclude that 7-day moving average of revenue just need one degree difference to become stationary and ready for prediction and it will only have one lag autoregression:
> ARIMA(1,1,0) for smooth revenue is our best model selection
For an elaborate on how we reach to this conclusion, please refer to [attachement](#attachment-arima-selection)

![arima forecast]({plot_name}.png)
> The total revenue forecast for March is **{predict['mean'].sum():.0f}** dollars
''')

