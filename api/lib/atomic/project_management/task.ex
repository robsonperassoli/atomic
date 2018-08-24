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

  def create_changeset(task, attrs) do
    task
    |> cast(attrs, [:description, :project_id])
    |> validate_required([:description, :project_id])
  end
end