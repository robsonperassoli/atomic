defmodule Atomic.Report do
  alias Atomic.ProjectManagement

  def tasks_by_date(user_id, project_id, start_date, end_date) do
    project = ProjectManagement.get_user_project!(user_id, project_id)
    tasks = ProjectManagement.get_tasks(project_id, start_date, end_date)

    total_time = tasks
    |> Enum.map(fn t -> t.time end)
    |> Enum.sum

    %{
      project: project,
      tasks: tasks,
      total_time: total_time,
      start_date: start_date,
      end_date: end_date
    }
  end

end
