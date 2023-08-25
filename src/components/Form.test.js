import { render, fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import Form from "./Form";

describe("My Form", () => {
  test("submit the form", () => {
    render(<Form />);

    // ! cari button
    const submitButton = screen.getByRole("button", { name: /kucing/i });

    // ! cari text input & isi value
    const input = screen.getByLabelText(/nama label/i);
    fireEvent.change(input, { target: { value: "isi textinput" } });

    // ! submit button nya
    fireEvent.click(submitButton);

    // ! expect muncul element text setelah tombol button di submit
    const submittedMessage = screen.getByText(/submitted/i);
    expect(submittedMessage).toBeInTheDocument();
  });

  /*
   * cek value props nya apa
   * dengan cara check value props / state yg ditampilkan di screen
   * trus update props nya & cek lagi perubahan nya di screen (after / before)
   */
  test("render component with initial props value = 0", () => {
    const initialNumber = 0;
    render(<Form initialNumber={initialNumber} />);

    const countValue = screen.getByTestId("count-value");
    expect(countValue).toHaveTextContent(initialNumber);
  });

  test("increments count when button is clicked", () => {
    const initialNumber = 0;
    render(<Form initialNumber={initialNumber} />);

    const incrementButton = screen.getByText(/Increment/i);
    const countValue = screen.getByTestId("count-value");

    expect(countValue).toHaveTextContent("0");
    fireEvent.click(incrementButton);
    expect(countValue).toHaveTextContent("1");
  });

  test("renders fetched data", async () => {
    const mockData = [
      { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" },
      { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv" },
      { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net" },
    ];

    jest
      .spyOn(axios, "get")
      .getMockImplementation(() => Promise.resolve({ data: mockData }));

    render(<Form />);

    const name1 = await screen.findByText("Leanne Graham");
    const email1 = screen.getByText("Sincere@april.biz");
    const name2 = await screen.findByText("Ervin Howell");
    const email2 = screen.getByText("Shanna@melissa.tv");
    const name3 = await screen.findByText("Clementine Bauch");
    const email3 = screen.getByText("Nathan@yesenia.net");

    expect(name1).toBeInTheDocument();
    expect(email1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(email2).toBeInTheDocument();
    expect(name3).toBeInTheDocument();
    expect(email3).toBeInTheDocument();

    axios.get.mockRestore();
  });
});
