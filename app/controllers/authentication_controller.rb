class AuthenticationController < ApplicationController
  def index
  end

  def create
    if params[:user][:name].present? && params[:user][:token].present?
      session[:username] = params[:user][:name]
      session[:token] = params[:user][:token]
      redirect_to root_path
    end
  end

  def destroy
    reset_session
    redirect_to_login
  end
end
