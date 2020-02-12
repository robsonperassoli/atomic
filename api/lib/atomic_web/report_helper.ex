defmodule AtomicWeb.ReportHelper do
  alias Phoenix.View
  alias AtomicWeb.ReportView

  def generate!(template_file, data) do
    View.render_to_string(ReportView, template_file, data)
    |> PdfGenerator.generate!(page_size: "A4")
  end

  def get_binary(id) do
    id
    |> parse_id()
    |> File.read!()
  end

  def create_id(filename), do: Base.url_encode64(filename)
  def parse_id(id), do: id |> Base.url_decode64!()
end
