defmodule AtomicWeb.ProjectManagementResolver do
  alias Atomic.ProjectManagement

  def list_projects(_root, _args, %{context: %{current_user: user}}) do
    projects = ProjectManagement.user_projects(user)
    {:ok, projects}
  end

  def list_projects(_root, _args, _info), do: {:error, "Authentication required"}

  def create_project(_root, args, %{context: %{current_user: user}}) do
    project_args = args
    |> Map.put(:user_id, user.id)

    case ProjectManagement.create_project(project_args) do
      {:ok, project} ->
        {:ok, project}
      _error ->
        {:error, "Could not create project"}
    end
  end

  def create_project(_root, _args, _info), do: {:error, "Authentication required"}

  def update_project(_root, args, %{context: %{current_user: user}}) do
    %{ :id => id } = args
    project = ProjectManagement.get_user_project!(user.id, id)
    case ProjectManagement.update_project(project, args) do
      {:ok, project} ->
        {:ok, project}
      _error ->
        {:error, "Could not update project"}
    end
  end

  def update_project(_root, _args, _info), do: {:error, "Authentication required"}

  def create_task(_root, args, %{context: %{current_user: user}}) do
    case ProjectManagement.create_task(args, user) do
      {:ok, task} -> 
        {:ok, task}
      _error -> 
        {:error, "Could not create the task"}
    end
  end

  def create_task(_root, _args, _info), do: {:error, "Authentication Required"}
end