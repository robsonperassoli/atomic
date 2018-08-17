defmodule AtomicWeb.ProjectManagementResolver do
  alias Atomic.ProjectManagement

  def list_projects(_root, _args, _info) do
    projects = ProjectManagement.list_projects
    {:ok, projects}
  end

  def create_project(_root, args, _info) do
    case ProjectManagement.create_project(args) do
      {:ok, project} ->
        {:ok, project}
      _error ->
        {:error, "Could not create project"}
    end
  end

  def update_project(_root, args, _info) do
    %{ :id => id } = args
    project = ProjectManagement.get_project!(id)
    case ProjectManagement.update_project(project, args) do
      {:ok, project} ->
        {:ok, project}
      _error ->
        {:error, "Could not update project"}
    end
  end
end