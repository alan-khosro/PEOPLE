
print('''## Attachment: ARIMA Selection
First we show there is no drift in 7-days moving average of revenue. Then, we show one degree difference is enough to make it stationary and perfect for ARIMA prediction. At the ned we run the ARIMA model selection based on AIC criteria.
''')

## Autocorrelation for smooth revenue

from __init__ import sns, plt, plot_path, title, autocorrelation_plot, ARIMA

from moving_average_analysis import ma_total

ma_diff = ma_total['revenue'].diff(1).dropna()



def plot_series (series, plot_name="temp"):
    y = series.to_frame().dropna()
    y['index'] = y.reset_index().index
    sns.lmplot(x='index', y=series.name, data=y, ci=99)
    plt.axhline(y=0, linestyle="dashed")
    plt.title(title(plot_name))
    plt.savefig(plot_path(plot_name), bbox_inches='tight')

plot_name = "smooth-revenue-daily-change"
plot_series(ma_diff, plot_name)

print(f'''### No Drift
Let us look at closer at the total revenue to see if there is any trend (drift) in our time series dataset.
> Null Hypothesis: there is no (linear) drift in revenue
One way to investigate is to plot daily changes of smooth revenue (today smooth revenue minus yesterday). If there is a (linear) trend, the (99%) confidence interval of the linear regression will **not** include the horizontal line $y = 0$.
![smooth revenue diff]({plot_name}.png)

The confidence interval of linear regression for daily change of smooth revenue includes the horizental like $y = 0$ so we can not reject the null hypothesis:
> There is no drif in revenue
''')


plot_name="autocorrelation-for-smooth-revenue"

fig, ax = plt.subplots()
autocorrelation_plot(ma_total['revenue'], label="smooth revenue")
autocorrelation_plot(ma_diff, label="smooth revenue daily change")
plt.legend()
plt.title(title(plot_name))
plt.savefig(plot_path(plot_name))

print(f'''### Transformation Selection
The graph below shows the autocorrelation for 7-days moving average revenue and its one degree difference transformation: daily changes of smooth revenue.
![autocorrelation of smooth revenue]({plot_name}.png)

It is evident that while the smooth revenue is significantly autocorrelated up to past 5 lags, its one degree difference has no significant autocorrelation. It shows that "daily change of smooth revenue" is a very good transformation that removes the autocorrelation problem.
> The daily changes of 7-days moving average revenue has no significant autocorrelation and it is stationary

''')


## ARIMA for 7-days moving average
diff_AICs = [ARIMA(ma_total['revenue'], freq='D', order=(i,0,0)).fit().aic for i in range(0,5)]
diff_aic = min(diff_AICs)
diff_q = diff_AICs.index(diff_aic)


ma_AICs = [ARIMA(ma_total['revenue'], freq='D', order=(i,1,0)).fit().aic for i in range(0,5)]
ma_aic = min(ma_AICs)
ma_q = ma_AICs.index(ma_aic)


model = ARIMA(ma_total['revenue'], freq='D', order=(1,1,0))
model_fit = model.fit()

print(f'''### ARIMA Parameters Selection
We use ARIMA(p,d,q) for prediction with following parameters:
- q = 0: we already used 7-days moving average
- p, d: select p,d that gives lowest AIC

The model selection criteria (AIC) for no transformation (q=0) gives:
```
{ma_AICs}
```
The model selection criteria (AIC) for one degree transformation (q=1) gives:
```
{diff_AICs}
```
So the selected ARIMA model for 7-days moving average of revenue is
ARIMA(1,1,0)
```
{model_fit.summary()}
```
''')

