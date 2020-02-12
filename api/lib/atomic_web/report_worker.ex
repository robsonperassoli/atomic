defmodule AtomicWeb.ReportWorker do
  alias Atomic.Report
  alias AtomicWeb.ReportHelper

  def base_url, do: "#{AtomicWeb.Endpoint.url()}/api/reports"

  def start_link(%{ type: :report } = event) do
    Task.start_link(fn ->
      IO.puts "starting report generation..."

      %{user_id: user_id, project_id: project_id, start_date: start_date, end_date: end_date} = event

      data = Report.tasks_by_date(user_id, project_id, start_date, end_date)

      id = ReportHelper.generate!("tasks.html", data)
      |> ReportHelper.create_id

      title = "Task report #{start_date} to #{end_date}"
      report = %{id: id, title: title, url: "#{base_url()}/#{id}"}

      Absinthe.Subscription.publish(AtomicWeb.Endpoint, report, report_finished: "user:#{user_id}")

      IO.puts "Finished report generation..."
    end)
  end
end
