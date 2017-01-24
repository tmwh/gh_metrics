# frozen_string_literal: true
require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'

  root to: 'metrics#index'
  get 'login', to: 'authentication#index'
  post 'login', to: 'authentication#create'
  get 'logout', to: 'authentication#destroy'
  post 'logout', to: 'authentication#destroy'
end
