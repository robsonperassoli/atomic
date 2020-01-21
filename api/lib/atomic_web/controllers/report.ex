defmodule AtomicWeb.ReportController do
  use AtomicWeb, :controller
  alias AtomicWeb.ReportView
  alias Phoenix.View
  alias Atomic.Report

  def print(conn, %{"project_id" => project_id, "start_date" => start_date, "end_date" => end_date}) do
    %{private: %{current_user: current_user}} = conn

    report = Report.tasks_by_date(current_user.id, project_id, start_date, end_date)

    binary_pdf = View.render_to_string(ReportView, "tasks.html", report)
    |> PdfGenerator.generate_binary!(page_size: "A4")

    conn
    |> put_resp_content_type("application/pdf")
    |> send_resp(200, binary_pdf)
  end
end
