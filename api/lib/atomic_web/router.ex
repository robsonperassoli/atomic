defmodule AtomicWeb.Router do
  use AtomicWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", AtomicWeb do
    pipe_through :api
  end
end
