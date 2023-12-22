import { ReactElement } from "react";
import { Helmet } from "react-helmet";

export default function ZohoSalesIQ(): ReactElement {
  return (
    <Helmet>
      <script type="text/javascript" id="zsiqchat">
        {`
          var $zoho = $zoho || {};
          $zoho.salesiq = $zoho.salesiq || {
            widgetcode: "ea4620f63fd762175b99e3461e58bbc8ff4b88a0d088fe7d2af4229e902c364a06d99144f80bdf6b365c5efc49d2d625",
            values: {},
            ready: function () {},
          };
          var d = document;
          var s = d.createElement("script");
          s.type = "text/javascript";
          s.id = "zsiqscript";
          s.defer = true;
          s.src = "https://salesiq.zoho.eu/widget";
          var t = d.getElementsByTagName("script")[0];
          t.parentNode.insertBefore(s, t);
        `}
      </script>
      <script type="text/javascript">
        {`
          var w = window;
          var p = w.location.protocol;
          if (p.indexOf("http") < 0) {
            p = "http" + ":";
          }
          var d = document;
          var f = d.getElementsByTagName("script")[0],
            s = d.createElement("script");
          s.type = "text/javascript";
          s.async = false;
          if (s.readyState) {
            s.onreadystatechange = function () {
              if (s.readyState == "loaded" || s.readyState == "complete") {
                s.onreadystatechange = null;
                try {
                  loadwaprops(
                    "3zb545e37a83d45ff332158d33147ec9d2",
                    "3z746ea102706089a1e1c5ba6f8b55ef57",
                    "3zef577c1ee32daf4072e7ad5ff680d2d4cdbb774720404314c9348ed521d6111d",
                    "3z29c9e33580c290b04f8d0b6b8fdf3cd8",
                    "0.0"
                  );
                } catch (e) {}
              }
            };
          } else {
            s.onload = function () {
              try {
                loadwaprops(
                  "3zb545e37a83d45ff332158d33147ec9d2",
                  "3z746ea102706089a1e1c5ba6f8b55ef57",
                  "3zef577c1ee32daf4072e7ad5ff680d2d4cdbb774720404314c9348ed521d6111d",
                  "3z29c9e33580c290b04f8d0b6b8fdf3cd8",
                  "0.0"
                );
              } catch (e) {}
            };
          }
          s.src = p + "//ma.zoho.eu/hub/js/WebsiteAutomation.js";
          f.parentNode.insertBefore(s, f);
        `}
      </script>
      <script>
        {`
          $zoho.salesiq.ready = function () {
            const { user } = JSON.parse(localStorage.getItem("tokens"));
            $zoho.salesiq.visitor.name(user.name);
            $zoho.salesiq.visitor.email(user.email);
          };
        `}
      </script>
    </Helmet>
  );
}
