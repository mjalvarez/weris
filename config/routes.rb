Rails.application.routes.draw do

  resources :snapshots do
    collection do
      get :weris
    end
  end

  get '/echo', controller: :echo, action: :process

  root 'pages#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
