defmodule Atomic.ProjectManagement.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :description, :string
    field :timer_started_at, :utc_datetime
    field :timer_stopped_at, :utc_datetime
    field :timer_status, :string
    field :time, :time
    field :tags, {:array, :string}
    belongs_to :project, Atomic.ProjectManagement.Project

    timestamps()
  end

  def changeset(task, attrs) do
    task
    |> cast(attrs, [:description, :timer_started_at, :timer_stopped_at, :timer_status, :time, :tags, :project_id])
    |> validate_required([:description, :project_id])
  end

  def start_changeset(task, attrs) do
    task
    |> cast(attrs, [:timer_started_at, :timer_status])
    |> validate_required([:timer_started_at, :timer_status])
  end

  def stop_changeset(task, attrs) do
    task
    |> cast(attrs, [:timer_stopped_at, :timer_status])
    |> validate_required([:timer_started_at, :timer_status])
  end

  def validate_task_stopped(changeset, field) do
    timer_status = get_field(changeset, field)
    case timer_status == "stopped" do
      true -> changeset
      false -> add_error(changeset, field, "Timer is running")
    end    
  end
end