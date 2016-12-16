class MetricsController < ApplicationController
  before_action :check_user_login
  rescue_from Github::Error::Unauthorized, with: :redirect_to_login

  def index
    @events = Event.all
  end
end
