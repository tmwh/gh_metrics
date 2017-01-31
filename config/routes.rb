# frozen_string_literal: true
require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'metrics#index'
  get 'login', to: 'authentication#index'
  post 'login', to: 'authentication#create'
  get 'logout', to: 'authentication#destroy'
  post 'logout', to: 'authentication#destroy'
  get 'setup', to: 'setup#index'
  get 'update_labels', to: 'setup#update_labels'

  mount Sidekiq::Web => '/sidekiq'
end
