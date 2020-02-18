defmodule Atomic.Factory do
  alias Atomic.{Accounts, ProjectManagement}
  alias Atomic.Accounts.User

  def uint do
    System.unique_integer([:positive])
  end

  def create_user(attrs \\ %{}) do
    id = uint()
    default_user = %{
      name: "User #{id}",
      email: "email-#{id}@test.com",
      password: "secret"
    }

    attrs
    |> Enum.into(default_user)
    |> Accounts.create_user()
  end

  def create_project(%{user: user} = attrs) do
    default_project = %{
      name: "Project #{uint()}"
    }

    attrs
    |> Enum.into(default_project)
    |> ProjectManagement.create_project(user)
  end

  def create_task(%{user: user, project: project} = attrs) do
    default_task = %{
      description: "Task #{uint()}",
      project_id: project.id
    }

    attrs
    |> Enum.into(default_task)
    |> ProjectManagement.create_task(user)
  end

end
