print('''## Compare forecast methods: Linear Regression vs Markov Process

I compare the forcasts from two methods:
- Linear Regression: Which assumes there is a trend in data
- Latest Moving Average: which assumes that there is no trend in data

I use MAPE (mean average percentage error) as the benchmark metrics. 

Since it is time-series data, for any given day (since the first observation), we split data into train and test:
- train dataset: all data before the given day
- test dataset: all data after the given day

We train data on train dataset and gather forecaset errors on test dataset for each forecasting method.
We repeat it for a range of given days (train_days) for instance train_days in range(40, 50). We do it for every group of dimensions (device, landing_page).

for df in data.groupby([device, landing_page]):
	for train_days in range(40, 50):
		split df into train and test
		calculate MAPE for for linear regression forecast and markov process forecast

Then we plot the 

''')

xxx = lambda grp, col: {train_days:compare(grp, col, train_days) for train_days in range(40,50)}

xxx = pd.DataFrame.from_dict(xxx, orient="index")

zzz = {key:pd.DataFrame(xxx(grp, col)) for key,grp in ma.groupby(dims)}
pd.DataFrame.from_dict(zzz)

compare_all_groups = lambda ma, col, train_days: {key:compare(grp, col, train_days) for key, grp in ma.groupby(["device", "landing_page"])}

compare_all_days = {train_days:pd.DataFrame.from_dict(compare_all_groups(ma, "revenue", train_days), orient="index") for train_days in range(40, 50)}

compare_all_days = pd.concat(compare_all_days)

compare_mape = compare_all_days.groupby(level=[1,2]).mean()

print(f'''## Conclusion: no trend
```
{compare_mape}
```
As it is evident, the linear regression did not produce a better prediction than markov chain prediction (the latest moving average obsrvation) for most of the groups. 
For total revenue, the MAPE (mean average percentage error) for linear regression prediction is {compare_mape.loc["all", "all"]["mape_lr"]:.2f} which is smaller that markov process prediction {compare_mape.loc["all", "all"]["mape_mp"]:.2f}
''')


def compare(df, col, train_days):
	df = df.reset_index()
	y = df[col].values
	x = df.index.values.reshape(-1,1)
	# train set
	y_train = y[:train_days]
	x_train = x[:train_days]
	# test set
	y_test = y[train_days:]
	x_test = x[train_days:]
	# regression
	reg = LinearRegression().fit(x_train, y_train)
	# r2 = reg.score(x_test, y_test) # coefficient of determination
	# errors
	error_lr = reg.predict(x_test) - y_test 
	error_mp = y_train[-1] - y_test
	# mean absolute error
	mape_lr = np.mean(np.abs(error_lr/y_test)) # mean absolute error (mae) of linear regression
	mape_mp = np.mean(np.abs(error_mp/y_test)) # mae of markov process
	#
	return {"mape_lr": mape_lr, "mape_mp": mape_mp}

