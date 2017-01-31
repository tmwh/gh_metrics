module MetricsHelper
  def checked_date_range_radio?(value)
    current_date_range = params['date_range']

    case value
    when 'week'
      current_date_range == value || !current_date_range.present?
    when 'month', '3_months'
      current_date_range == value
    end
  end
end
