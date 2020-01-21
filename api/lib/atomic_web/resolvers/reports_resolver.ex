defmodule AtomicWeb.ReportsResolver do
  alias Atomic.Reports

  def base_url, do: "#{AtomicWeb.Endpoint.url()}/api/reports"

  def random_string(length) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64 |> binary_part(0, length)
  end

  def request_tasks_report(_root, args, %{context: %{current_user: user}}) do
    %{ start_date: start_date, end_date: end_date, project_id: project_id } = args


    id = random_string(32)
    title = "Task report #{start_date} to #{end_date}"
    report = %{id: id, title: title, url: "#{base_url()}/tasks?project_id=#{project_id}&start_date=#{start_date}&end_date=#{end_date}"}

    Absinthe.Subscription.publish(AtomicWeb.Endpoint, report, report_finished: "user:#{user.id}")
    {:ok, true}
  end
end
