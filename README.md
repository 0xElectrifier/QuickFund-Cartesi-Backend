<div>
  <h3 align="center">QuickFund Dapp</h3>

  <p align="center">
    The QuickFund (A mini Crowdfunding platform) dapp documentation.
  </p>
</div>

## About
<p>
    QuickFund is a decentralized application (dapp) powered by <a href="https://docs.cartesi.io/cartesi-rollups/1.3/">cartesi</a> rollups technology.
</p>
<p> 
    QuickFund is a crowdfunding platform that helps you effortlesly raise funds. Just create a campaign, inform to family & friends and allow the platform securely handle the entire process.
</p>

## Getting Started

Below you'll find instructions on how setting up this dapp locally.

### Prerequisites

Here are some packages you need to have installed on your PC:

* [nodejs](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) 

* [docker](https://docs.docker.com/get-docker/)

* [cartesi-cli](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)
  ```sh
  npm install -g @cartesi/cli
  ```

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/0xElectrifier/QuickFund-Cartesi-Backend.git
   ```
2. Install NPM packages
   ```sh
   yarn  install
   ```
3. Build and run the dapp via `cartesi-cli`
   ```sh
   cartesi build 
   ```
   and
   ```sh
   cartesi run 
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Here you can access the examples of dapp communication and resources consume.

There are these resources available on this dapp:

### Advanced handlers
* #### create_campaign
  ```js
    description — start a fundraising campaign.
    param method — "create_campaign"
    param goal - Number(Eth)
    param duration - Number(Days)
  ```
  data sample
  ```json
    {
        "method": "create_campaign",
        "goal": 2,
        "duration": 30
    }
  ```
  hex sample
  ```
  0x7b226d6574686f64223a20226372656174655f63616d706169676e222c2022676f616c223a20322c20226475726174696f6e223a2033307d
  ```
  interact
    - *via `cartesi cli`*, access your terminal in another window and input these instructions below:

    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b226d6574686f64223a20226372656174655f63616d706169676e222c2022676f616c223a20322c20226475726174696f6e223a2033307d
    ```

* #### contribute
  ```js
    description — Sends donation amount to intended campaign wallet.
    param method - "contribute"
    param campaign_id - address of campaign creator.
  ```
  data sample
  ```json
    {
      "method": "contribute",
      "campaign_id": "0x3C9891cee8A9b286e2114981b7cAB6c0Ad62FeDc"
    }
  ```
  hex sample
  ``` 
  0x7b226d6574686f64223a2022636f6e74726962757465222c202263616d706169676e5f6964223a2022307833433938393163656538413962323836653231313439383162376341423663304164363246654463227d
  ```
  interact
    - *via `cartesi cli`*, access your terminal in another window and input these instructions below:
  
    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b226d6574686f64223a2022636f6e74726962757465222c202263616d706169676e5f6964223a2022307833433938393163656538413962323836653231313439383162376341423663304164363246654463227d
    ```

### Inspect handlers 
* #### listContributors
  ```js
    description — Get all contributors to a campaign.
  ```
  returned hex sample
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        ...
    }
  ```
  converted payload sample
  ```json 
    [
        {
            "campaignID":"0x3C9891cee8A9b286e2114981b7cAB6c0Ad62FeDc",
            "creatorAddress":"0x3C9891cee8A9b286e2114981b7cAB6c0Ad62FeDc",
            "goal":2,
            "amountPledged":"0.1",
            "createdAt": "2024-08-06T15:59:54.843Z",
            "endAt": "2024-08-06T15:59:54.843Z",
        },
        ...
    ]

  ```
  interact
    - access the cartesi inspect endpoint on your browser
  ```sh 
  http://localhost:8080/inspect/<campaign_creator_address>/listContributors
  ```

* #### amountRaised
  ```js
    description — get the total amount raised for a campaign.
  ```
  returned hex sample
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        ...
    }
  ```
  
  interact
    - access the cartesi inspect endpoint on your browser
  ```sh 
  http://localhost:8080/inspect/<campaign_creator_address>/amountRaised
  ```

* #### about
  ```js
    description — fetch information about campaign.
  ```
  returned hex sample
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        ...
    }
  ```
  interact
    - access the cartesi inspect endpoint on your browser
  ```sh 
  http://localhost:8080/inspect/<campaign_creator_address>/about
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing
We welcome contributions from the community! If you'd like to contribute to Bshelf, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with descriptive commit messages.
- Push your changes to your forked repository.
- Submit a pull request to the main repository.
- Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
QuickFund is released under the MIT License.
