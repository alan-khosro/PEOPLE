

select total_page_view_count, mean_daily_page_view_count, mean_daily_homepage_view_count

## SQL1
Please write a SINGLE query statement that returns the following for EACH month:
- Total page views
- Average Daily Total page views –Not Avg Daily by page/platform/customer. 
- Average Daily Home Page views- Not Avg Daily by page/platform/customer.


```sql
SELECT
	SUM(page_views) as total_page_views
	, SUM(page_views)/COUNT(DISTINCT(date)) AS average_daily_total_page_views
	, SUM(CASE WHEN page = 'homepage' THEN page_views ELSE 0 END)/COUNT(DISTINCT(date)) AS average_daily_homepage_views
FROM 
	traffic_segment
GROUP BY 
	FORMAT(date,"MMM-YY") AS month_year
```

I assumed date column is type date, if it is string `date` become `CAST(date as DATE) date`
 
## SQL2

```sql
SELECT
	MONTH(date) month_,
	, segment_name
	, platform
	, (CASE WHEN revenue<25 THEN 'low_revenue' WHEN revenue<75 THEN 'mid_revenue' WHEN revenue>75 THEN 'high_revenue' END) revenue_category
	, COUNT(session_id) session_count
	, SUM(revenue)/COUNT(session_id) revenue_per_session
FROM
	traffic_segment
LEFT JOIN
	segment
USING
	segment_id
group by
	month_
	, segment_name
	, platform
	, revenue_category
WHERE 
	MONTH(date) = 2
```

I assumed we are using postgres which support using created alias columns in group by. If it is sql-server:
```sql
SELECT
	MONTH(date) month_,
	, segment_name
	, platform
	, (CASE WHEN revenue<25 THEN 'low_revenue' WHEN revenue<75 THEN 'mid_revenue' WHEN revenue>75 THEN 'high_revenue' END) revenue_category
	, COUNT(session_id) session_count
	, SUM(revenue)/COUNT(session_id) revenue_per_session
FROM
	traffic_segment
LEFT JOIN
	segment
USING
	segment_id
group by
	MONTH(date)
	, segment_name
	, platform
	, (CASE WHEN revenue<25 THEN 'low_revenue' WHEN revenue<75 THEN 'mid_revenue' WHEN revenue>75 THEN 'high_revenue' END)
WHERE 
	MONTH(date) = 2
```

# SQL3

```sql

SELECT 
	customer_id
	, date
	, MAX(revenue) max_session_revenue
	, session_id
	, session_sequence
FROM 
	(
		SELECT 
			customer_id
			, date
			, revenue 
			, session_id
			, (row_number() OVER (PARTIRION BY customer_id ORDER BY date, time)) session_sequence
		FROM
			traffic_segment
		Where
			YEAR(date) = 2017
	)
GROUP BY
	customer_id

```

