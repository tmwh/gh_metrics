# frozen_string_literal: true
class GroupedEventsCarrier
  def initialize(events, date_range_params)
    @events = events
    @date_range_params = date_range_params
  end

  def collection
    weekly_or_monthly? ? week_or_month_collection : three_week_collection
  end

  def label_colors
    events.group_by(&:label_color).keys
  end

  def days
    weekly_or_monthly? ? week_or_month_days : three_months_days
  end

  def collection_today
    events.where(created: Date.today).group_by(&:label_name).values.map(&:count)
  end

  def label_colors_today
    events.where(created: Date.today).group_by(&:label_color).keys
  end

  private

  attr_reader :events, :date_range_params

  def week_or_month_days
    date_range_count.times.reduce([]) do |array, index|
      array << (Date.today - index).strftime(strftime_format)
    end.reverse
  end

  def three_months_days
    weeks_count_in_date_range.times.reduce([]) do |array, index|
      array << formatted_weekly_date_range(index)
    end.reverse
  end

  def week_or_month_collection
    uniq_labels.reduce([]) do |array, label|
      events_per_day = []
      date_range_count.times.each do |index|
        events_per_day << events.where(created: [Date.today - index], label_name: label).count
      end
      array << cumulate!(events_per_day.reverse)
    end
  end

  def three_week_collection
    uniq_labels.reduce([]) do |array, label|
      events_per_day = []
      weeks_count_in_date_range.times.each do |index|
        events_per_day << events.where(created: date_range_for_per_week_format(index), label_name: label).count
      end
      array << cumulate!(events_per_day.reverse)
    end
  end

  def date_range_for_per_week_format(index)
    Array(Date.today.advance(weeks: - (index + 1)) + 1..Date.today.advance(days: -(Date.today.advance(weeks: - index) + 1..Date.today).count))
    # Will generate array of 7 dates per each week, example:
    # for case when index 0: [6 days ago..today]
    # for case when index 1: [13 days ago..today - 7 days] etc
  end

  def formatted_weekly_date_range(index)
    [
      date_range_for_per_week_format(index).first.strftime('%m.%d'),
      date_range_for_per_week_format(index).last.strftime('%m.%d')
    ].join(' - ')
  end

  def weeks_count_in_date_range
    date_range_count / 7
  end

  def strftime_format
    weekly_or_undefined? ? '%a' : '%m.%d'
  end

  def weekly_or_undefined?
    date_range_params == 'week' || !date_range_params.present?
  end

  def weekly_or_monthly?
    weekly_or_undefined? || date_range_params == 'month'
  end

  def cumulate!(array)
    sum = 0
    array.map{ |x| sum += x }
  end

  def uniq_labels
    events.map(&:label_name).uniq
  end

  def date_range_count
    return LoadEventsService::LOAD_EVENTS_WEEK_RANGE.count unless date_range_params.present?

    case date_range_params
    when 'week'
      LoadEventsService::LOAD_EVENTS_WEEK_RANGE.count
    when 'month'
      LoadEventsService::LOAD_EVENTS_MONTH_RANGE.count
    when '3_months'
      LoadEventsService::LOAD_EVENTS_THREE_MONTHS_RANGE.count
    end
  end
end
