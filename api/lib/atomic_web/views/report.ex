defmodule AtomicWeb.ReportView do
  use AtomicWeb, :view

  def format_time(time_in_seconds) do
    time_in_seconds / 60 / 60
    |> Float.round(2)
  end

  def format_date(date) do
    date
    |> Timex.format!("{M}/{D}/{YYYY}")
  end
end
