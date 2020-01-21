defmodule AtomicWeb.ReportController do
  use AtomicWeb, :controller
  alias AtomicWeb.ReportView
  alias Atomic.ProjectManagement


  def print(conn, %{"project_id" => project_id, "start_date" => start_date, "end_date" => end_date}) do
    %{private: %{current_user: current_user}} = conn
    project = ProjectManagement.get_user_project!(current_user.id, project_id)
    tasks = ProjectManagement.get_tasks(project_id, start_date, end_date)

    {:ok, pid} = Gutenex.start_link
    #Gutenex.add_image(pid, alpaca_alias, alpaca_rendition) |>
    Gutenex.begin_text(pid)
    |> Gutenex.set_font("Helvetica", 48)
    |> Gutenex.text_position(40, 180)
    |> Gutenex.text_render_mode(:fill)
    |> Gutenex.write_text("ABC")
    |> Gutenex.set_font("Courier", 32)
    |> Gutenex.text_render_mode(:stroke)
    |> Gutenex.write_text("xyz")
    |> Gutenex.end_text
    |> Gutenex.move_to(400, 20)
    #Gutenex.draw_image(alpaca_alias, %{ translate_x: 300, translate_y: 500, })

    binary_pdf = Gutenex.export(pid)

    Gutenex.stop(pid)

    conn
    |> put_resp_content_type("application/pdf")
    |> send_resp(200, binary_pdf)
    #text(conn, "view report #{start_date} #{end_date}")
  end
end
