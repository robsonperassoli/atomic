defmodule AtomicWeb.ReportController do
  use AtomicWeb, :controller
  alias AtomicWeb.ReportHelper

  def print(conn, %{"id" => report_id}) do
    binary_pdf = ReportHelper.get_binary(report_id)

    conn
    |> put_resp_content_type("application/pdf")
    |> send_resp(200, binary_pdf)
  end
end
