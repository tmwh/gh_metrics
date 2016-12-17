class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :login?

  def check_user_login
    unless login?
      flash[:notice] = 'Please login first!'
      redirect_to_login
      reset_session
    end
  end

  def reset_session
    session[:username] = ''
    session[:token] = ''
  end

  def login?
    session[:username].present? && session[:token].present?
  end

  def redirect_to_login
    redirect_to login_path
  end
end
