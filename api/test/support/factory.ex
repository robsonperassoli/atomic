defmodule Atomic.Factory do
  alias Atomic.{Accounts, ProjectManagement}
  alias Atomic.Accounts.User

  def uint do
    System.unique_integer([:positive])
  end

  def create_user(attrs \\ %{}) do
    default_user = %{
      name: "User #{uint()}",
      email: "email-#{uint()}@test.com",
      password: "secret"
    }

    attrs
    |> Enum.into(default_user)
    |> Accounts.create_user()
  end

  def create_project(attrs \\ %{}, %User{} = user) do
    default_project = %{
      name: "Project #{uint()}"
    }

    attrs
    |> Enum.into(default_project)
    |> ProjectManagement.create_project(user)
  end

end
