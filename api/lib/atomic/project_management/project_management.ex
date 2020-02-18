defmodule Atomic.ProjectManagement do
  @moduledoc """
  The ProjectManagement context.
  """

  import Ecto.Query, warn: false
  alias Atomic.Repo
  alias Ecto.Changeset

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

  def get_user_project(user_id, id), do: Repo.get_by(Project, id: id, user_id: user_id)

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
    get_user_project(user.id, id)
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

  def create_task(attrs \\ %{}, user) do
    %{ project_id: project_id, description: description } = attrs
    _project = get_user_project(user.id, project_id)

    %Task{}
    |> Task.changeset(%{
      project_id: project_id,
      description: description,
      timer_status: "running",
      timer_started_at: DateTime.utc_now,
      time: Map.get(attrs, :time) || 0
    })
    |> Repo.insert()
  end

  def update_task(%{:id => id} = attrs, user) do
    get_user_task(id, user.id)
    |> Task.changeset(attrs)
    |> Repo.update
  end

  def start_task(task_id, user) do
    get_user_task(task_id, user.id)
    |> Task.changeset(%{timer_started_at: DateTime.utc_now, timer_status: "running"})
    |> Repo.update
  end

  defp calculate_elapsed_time(%Task{timer_started_at: timer_started_at, time: time}) do
    elapsed_seconds = DateTime.diff(DateTime.utc_now, timer_started_at, :seconds)
    time + elapsed_seconds
  end

  def stop_task(task_id, user) do
    task = get_user_task(task_id, user.id)

    task
    |> Task.changeset(%{timer_stopped_at: DateTime.utc_now, timer_status: "stopped"})
    |> Changeset.put_change(:time, calculate_elapsed_time(task))
    |> Repo.update
  end

  def delete_task(task_id, user) do
    task = get_user_task(task_id, user.id)

    task
    |> Repo.delete
  end

  def get_tasks(project_id, created_at_start, created_at_end) do
    query = from t in Task,
      where: t.inserted_at >= ^created_at_start and
        t.inserted_at <= ^created_at_end and
        t.project_id == ^project_id
    Repo.all(query)
  end
end
