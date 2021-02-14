const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const DashboardPlugin = require("@module-federation/dashboard-plugin");

const deps = require("./package.json").dependencies;

module.exports = (_, argv) => {
  const buyerWebServer =
    argv.mode === "development"
      ? "http://localhost:8081"
      : "https://prod-buyer-web.netlify.app";

  const sellerWebServer =
    argv.mode === "development"
      ? "http://localhost:8082"
      : "https://prod-seller-web.netlify.app";

  return {
    output: {
      publicPath:
        argv.mode === "development"
          ? "http://localhost:8080/"
          : "https://prod-app-shell.netlify.app/",
      chunkFilename: "[id].[contenthash].js",
    },
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 8080,
      historyApiFallback: true,
      hot: false,
      hotOnly: false,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "appshell",
        filename: "remoteEntry.js",
        remotes: {
          buyerweb: `buyerweb@${buyerWebServer}/remoteEntry.js`,
          sellerweb: `sellerweb@${sellerWebServer}/remoteEntry.js`,
        },
        exposes: {
          "./auth": "./src/auth",
          "./appRouterPaths": "./src/paths",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      // new DashboardPlugin({
      //   filename: "dashboard.json",
      //   dashboardURL: "http://localhost:3000/api/update",
      //   metadata: {
      //     remote: "http://localhost:8081/remoteEntry.js",
      //   },
      // }),
    ],
  };
};
