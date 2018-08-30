defmodule Atomic.ProjectManagement do
  @moduledoc """
  The ProjectManagement context.
  """

  import Ecto.Query, warn: false
  alias Atomic.Repo

  alias Atomic.ProjectManagement.Project
  alias Atomic.ProjectManagement.Task
  alias Atomic.Accounts.User

  @doc """
  Returns the list of projects.

  ## Examples

      iex> list_projects()
      [%Project{}, ...]

  """
  def list_projects do
    Repo.all(Project)
  end

  def user_projects(user) do
    %User{projects: projects} = Repo.preload(user, :projects)    
    projects
  end

  @doc """
  Gets a single project.

  Raises `Ecto.NoResultsError` if the Project does not exist.

  ## Examples

      iex> get_project!(123)
      %Project{}

      iex> get_project!(456)
      ** (Ecto.NoResultsError)

  """
  def get_project!(id), do: Repo.get!(Project, id)
  
  def get_user_project!(user_id, id), do: Repo.get_by!(Project, id: id, user_id: user_id)

  def get_user_task(task_id, user_id) do
    task = Repo.get!(Task, task_id)
    |> Repo.preload(:project)
    
    %Project{user_id: project_user_id} = task.project

    cond do
      project_user_id == user_id ->
        task
      true ->
        nil
    end
  end

  @doc """
  Creates a project.

  ## Examples

      iex> create_project(%{field: value})
      {:ok, %Project{}}

      iex> create_project(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_project(attrs \\ %{}, user) do
    attrs_with_user = attrs
    |> Map.put(:user_id, user.id)

    %Project{}
    |> Project.changeset(attrs_with_user)
    |> Repo.insert()
  end

  @doc """
  Updates a project.

  ## Examples

      iex> update_project(%{field: new_value})
      {:ok, %Project{}}

      iex> update_project(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_project(%{:id => id} = attrs, user) do
    get_user_project!(user.id, id)
    |> Project.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Project.

  ## Examples

      iex> delete_project(project)
      {:ok, %Project{}}

      iex> delete_project(project)
      {:error, %Ecto.Changeset{}}

  """
  def delete_project(%Project{} = project) do
    Repo.delete(project)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking project changes.

  ## Examples

      iex> change_project(project)
      %Ecto.Changeset{source: %Project{}}
  """
  def change_project(%Project{} = project) do
    Project.changeset(project, %{})
  end


  def create_task(%{project_id: project_id} = attrs \\ %{}, user) do
    _project = get_user_project!(user.id, project_id)

    %Task{}
    |> Task.changeset(attrs)
    |> Repo.insert()
  end

  def start_task(task_id, user) do
    get_user_task(task_id, user.id)
    |> Task.start_changeset(%{timer_started_at: DateTime.utc_now, timer_status: "running"})
    |> Repo.update
  end

  def stop_task(task_id, user) do
    get_user_task(task_id, user.id)
    |> Task.stop_changeset(%{timer_stopped_at: DateTime.utc_now, timer_status: "stopped"})
    |> Repo.update
  end
end
