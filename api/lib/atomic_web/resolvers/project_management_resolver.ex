defmodule AtomicWeb.ProjectManagementResolver do
  alias Atomic.ProjectManagement
  import AtomicWeb.Resolvers.Helpers

  def list_projects(_root, _args, %{context: %{current_user: user}}) do
    projects = ProjectManagement.user_projects(user)
    {:ok, projects}
  end

  def list_tasks(%ProjectManagement.Project{id: id}, args, %{context: %{current_user: user}}) do
    %{created_at_start: created_at_start, created_at_end: created_at_end} = args
    project = ProjectManagement.get_user_project(user.id, id)
    tasks = ProjectManagement.get_tasks(project.id, created_at_start, created_at_end)
    {:ok, tasks}
  end

  def get_project(_root, %{id: id}, %{context: %{current_user: user}}) do
    case ProjectManagement.get_user_project(user.id, id) do
      nil -> {:error, "Project not found"}
      project -> {:ok, project}
    end
  end

  def create_project(_root, args, %{context: %{current_user: user}}) do
    case ProjectManagement.create_project(args, user) do
      {:ok, project} ->
        {:ok, project}
      {:error, changeset} ->
        create_error("Could not create project", changeset)
    end
  end

  def update_project(_root, args, %{context: %{current_user: user}}) do
    case ProjectManagement.update_project(args, user) do
      {:ok, project} ->
        {:ok, project}
        {:error, changeset} ->
          create_error("Could not update project", changeset)
    end
  end

  def create_task(_root, args, %{context: %{current_user: user}}) do
    case ProjectManagement.create_task(args, user) do
      {:ok, task} ->
        {:ok, task}
      {:error, changeset} ->
        create_error("Could not create the task", changeset)
    end
  end

  def update_task(_root, args, %{context: %{current_user: user}}) do
    case ProjectManagement.update_task(args, user) do
      {:ok, task} ->
        {:ok, task}
      {:error, changeset} ->
        create_error("Could not update the task", changeset)
    end
  end

  def delete_task(_root, %{id: id}, %{context: %{current_user: user}}) do
    case ProjectManagement.delete_task(id, user) do
      {:ok, _} ->
        {:ok, id}
      {:error, changeset} ->
        create_error("Could not delete the task", changeset)
    end
  end

  def start_task(_root, %{task_id: task_id}, %{context: %{current_user: user}}) do
    case ProjectManagement.start_task(task_id, user) do
      {:ok, task} ->
        {:ok, task}
      {:error, changeset} ->
        create_error("Error starting the task timer", changeset)
    end
  end

  def stop_task(_root, %{task_id: task_id}, %{context: %{current_user: user}}) do
    case ProjectManagement.stop_task(task_id, user) do
      {:ok, task} ->
        {:ok, task}
      {:error, changeset} ->
        create_error("Error stopping the task timer", changeset)
    end
  end
end
