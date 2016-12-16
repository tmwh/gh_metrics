class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def check_user_login
    if session[:username].present? && session[:token].present?
      LoadEventsFromGithubService.new(
        session[:token], session[:username], 'check_delivery_time_and_status'
      ).perform
    else
      flash[:notice] = 'Fuck you!!!!!!!!!!!!!!.'
      redirect_to_login
    end
  end

  def redirect_to_login
    flash[:notice] = 'You have successfully logged out.'
    redirect_to login_path
  end
end
