defmodule AtomicWeb.Router do
  use AtomicWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug AtomicWeb.ApiContext
  end

  pipeline :graphql do
    plug AtomicWeb.GraphQLContext
  end

  scope "/api", AtomicWeb do
    pipe_through :api

    get "/reports/tasks", ReportController, :print
  end

  scope "/graphql" do
    pipe_through :graphql
    forward "/", Absinthe.Plug,
      schema: AtomicWeb.Schema
  end

  forward "/graphiql", Absinthe.Plug.GraphiQL,
    schema: AtomicWeb.Schema
end
