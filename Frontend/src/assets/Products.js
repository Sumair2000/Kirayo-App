const products = [
  {
    id: 1,
    name: "Drill Machine",
    category: "Tools",
    imageUrl:
      "https://images.unsplash.com/photo-1662350688784-104a3a954692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=450&q=80",
    price: 200,
    address:
      "Tariq Rd, Delhi Society Block 2 PECHS, Karachi, Karachi City, Sindh, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [25.053109, 67.121006],
  },
  {
    id: 2,
    name: "Tuxedo Black Shawl Collaw New",
    category: "Apparel",
    imageUrl:
      "https://www.classy.ca/wp-content/uploads/2022/02/BLACK_tuxedo_272-scaled.jpg",
    price: 400,
    address:
      "Main Main University Rd, Block 15 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [25.054711, 67.049818],
  },
  {
    id: 3,
    name: "Shoes",
    category: "Footwear",
    imageUrl:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
    price: 600,
    address:
      "Old Sabzi Mandi, Main Main University Rd, near Faizan e Madina،, Essa Nagri Gulshan-e-Iqbal, Karachi, 75300, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [24.865182912613108, 67.056054111362],
  },
  {
    id: 4,
    name: "Random",
    category: "Appliances",
    imageUrl: "https://picsum.photos/200",
    price: 800,
    address:
      "V3WJ+CHG, National Stadium Colony Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [25.023823, 66.997341],
  },
  {
    id: 5,
    name: "Honda Generator",
    category: "Tools",
    imageUrl:
      "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2021/07/1440x900-01-1-1024x640.jpg",
    price: 200,
    address:
      "W3X8+49, Gulshan-e-Waseem Block N North Nazimabad Town, Karachi, Karachi City, Sindh, Pakistan",
    date: "24 Jan 2023",
    Saved: true,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [25.029578, 67.054247],
  },
  {
    id: 6,
    name: "2 seater sofa",
    category: "Furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    price: 400,
    address:
      "A-495 Allama Shabbir Ahmed Usmani Rd, Block 3 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [25.009909, 67.102638],
  },
  {
    id: 7,
    name: "random",
    category: "Furniture",
    imageUrl: "https://picsum.photos/200",
    price: 600,
    address:
      "Deluxe Center, Plot CS 65, Federal B Area Block 7 Gulberg Town, Karachi, Karachi City, Sindh 75950, Pakistan",
    date: "24 Jan 2023",
    Saved: true,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [24.971174, 67.101694],
  },
  {
    id: 8,
    name: "Leather Boots",
    category: "Footwear",
    imageUrl:
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    price: 800,
    address: "ST-01, Block 2 Azizabad Main Rd, Karachi, 75950, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [24.973664, 67.065388],
  },
  {
    id: 9,
    name: "Juicer Blenders",
    category: "Kitchenware",
    imageUrl:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1205&q=80",
    price: 200,
    address: "Block 3 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [24.953635, 67.097712],
  },
  {
    id: 10,
    name: "Black Blazer",
    category: "Apparel",
    imageUrl:
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    price: 400,
    address:
      "A27/1 khudadad colony society office single, Block 1 Khudadad Colony, Karachi, Karachi City, Sindh 74800, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    coordinates: [24.94109, 67.051397],
  },
  {
    id: 11,
    name: "Camera gears",
    category: "Equipment",
    imageUrl:
      "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=724&q=80",
    price: 600,
    address:
      "Shahrah-e-Qaideen, P.E.C.H.S Block 2 Block 2 PECHS, Karachi, Karachi City, Sindh 75400, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [24.925026, 67.071138],
  },
  {
    id: 12,
    name: "Apple Laptop",
    category: "Computng",
    imageUrl:
      "https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    price: 800,
    address:
      "Block 13، Block 13 Gulberg Town شاہراہ پاکستان، Road, Block 13 Gulberg Town, Karachi, Karachi City, Sindh 78500, Pakistan",
    date: "24 Jan 2023",
    Saved: false,
    description:
      "ALDO OXFORD SHOES\nTan color\nGenuine Seude cow leather\nSize 43/10\nSlightly used\n9.5/10 condition\nGrey, white and black laces available\nPlease don’t use without socks",
    coordinates: [24.915919, 67.034746],
  },
];

export default products;
