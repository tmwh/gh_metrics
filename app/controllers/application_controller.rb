class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :user_signed_in?, :current_user

  private

  LOAD_EVENTS_DATE_RANGE = Array(Date.today - 7..Date.today)

  def check_user_login
    unless user_signed_in?
      flash[:notice] = 'Please login first!'
      redirect_to_login
      reset_session
    end
  end

  def reset_session
    session[:user_github_id] = ''
    session[:token] = ''
  end

  def user_signed_in?
    session[:token].present?
  end

  def current_user
    return @_current_user if defined?(@_current_user)
    return unless user_signed_in?
    @_current_user = User.find_by(github_id: session[:user_github_id])
  end

  def redirect_to_login
    redirect_to login_path
  end

  protected

  def load_repositories
    Github.new(oauth_token: session[:token]).repos.list.map(&:name)
  end

  def load_events
    if params[:repository].present?
      Event.where(repo: params[:repository], created: LOAD_EVENTS_DATE_RANGE)
    else
      Event.where(repo: load_repositories.first, created: LOAD_EVENTS_DATE_RANGE)
    end
  end
end
