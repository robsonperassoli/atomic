defmodule AtomicWeb.Router do
  use AtomicWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AtomicWeb do
    pipe_through :api
    
  end

  scope "/graphql" do
    forward "/", Absinthe.Plug,
      schema: AtomicWeb.Schema
  end
end
