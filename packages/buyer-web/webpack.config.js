const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const DashboardPlugin = require("@module-federation/dashboard-plugin");
const deps = require("./package.json").dependencies;

module.exports = (_, argv) => {
  const appWebServer =
    argv.mode === "development"
      ? "http://localhost:8080"
      : "https://prod-app-shell.netlify.app";

  return {
    output: {
      publicPath:
        argv.mode === "development"
          ? "http://localhost:8081/"
          : "https://prod-buyer-web.netlify.app/",
      chunkFilename: "[id].[contenthash].js",
    },

    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },

    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 8081,
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
        name: "buyerweb",
        filename: "remoteEntry.js",
        remotes: {
          appshell: `appshell@${appWebServer}/remoteEntry.js`,
        },
        exposes: {
          "./AdDetails": "./src/AdDetails",
          "./AdList": "./src/Home",
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
      //     remote: "http://localhost:8080/remoteEntry.js",
      //   },
      // }),
    ],
  };
};
