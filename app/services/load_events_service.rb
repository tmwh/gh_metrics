class LoadEventsService
  LOAD_EVENTS_WEEK_RANGE = Array(Date.today - 6..Date.today)
  LOAD_EVENTS_MONTH_RANGE = Array(Date.today.advance(months: - 1) + 1..Date.today)
  LOAD_EVENTS_THREE_MONTHS_RANGE = Array(Date.today.advance(months: - 3) + 1..Date.today)

  def initialize(repository_params, date_range_params, first_repository_name)
    @repository_params = repository_params
    @date_range_params = date_range_params
    @first_repository_name = first_repository_name
  end

  def perform
    events
  end

  private

  attr_reader :repository_params, :date_range_params

  def events
    return load_events(LOAD_EVENTS_WEEK_RANGE) unless date_range_params.present?

    case date_range_params
    when 'week'
      load_events(LOAD_EVENTS_WEEK_RANGE)
    when 'month'
      load_events(LOAD_EVENTS_MONTH_RANGE)
    when '3_months'
      load_events(LOAD_EVENTS_THREE_MONTHS_RANGE)
    end
  end

  def load_events(date_range)
    @_load_name = if repository_params.present?
      Event.where(repo: repository_params, created: date_range)
    else
      Event.where(repo: @first_repository_name, created: date_range)
    end
  end
end
