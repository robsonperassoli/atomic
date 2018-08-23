defmodule AtomicWeb.Router do
  use AtomicWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    
  end

  pipeline :graphql do
    plug AtomicWeb.Context
  end

  scope "/", AtomicWeb do
    pipe_through :api    
  end

  scope "/graphql" do
    pipe_through :graphql
    forward "/", Absinthe.Plug,
      schema: AtomicWeb.Schema
  end
end
