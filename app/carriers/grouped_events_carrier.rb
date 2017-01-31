# frozen_string_literal: true
class GroupedEventsCarrier
  def initialize(events, date_range_params)
    @events = events
    @date_range_params = date_range_params
  end

  def collection
    uniq_labels.reduce([]) do |array, label|
      events_per_day = []
      date_range_count.times.each do |index|
        events_per_day << events.where(created: [Date.today - index], label_name: label).count
      end
      array << cumulate!(events_per_day.reverse)
    end
  end

  def label_colors
    uniq_labels.reduce([]) do |array, label|
      array << events.find_by_label_name(label).label_color
    end
  end

  def days
    date_range_count.times.reduce([]) do |array, index|
      array << (Date.today - index).strftime(strftime_format)
    end.reverse
  end

  private

  attr_reader :events, :date_range_params

  def strftime_format
    date_range_params == 'week' ? '%a' : '%m.%d'
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
