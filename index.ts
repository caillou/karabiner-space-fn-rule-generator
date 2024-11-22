const keys = [
  { key: "i", value: "up_arrow" },
  { key: "j", value: "left_arrow" },
  { key: "k", value: "down_arrow" },
  { key: "l", value: "right_arrow" },
  { key: "h", value: "delete_or_backspace" },
  {
    key: "v",
    value: {
      key_code: "v",
      modifiers: ["left_control", "left_option"],
    },
  },
  {
    key: "u",
    value: {
      // Go to previous tab in most apps
      key_code: "open_bracket",
      modifiers: ["left_command", "left_shift"],
    },
  },
  {
    key: "o",
    value: {
      // Go to previous tab in most apps
      key_code: "close_bracket",
      modifiers: ["left_command", "left_shift"],
    },
  },
] as const;

const config = {
  description: "SpaceFN",
  manipulators: keys
    .map(({ key, value }) => {
      const to = typeof value === "string" ? [{ key_code: value }] : [value];
      return [
        {
          conditions: [
            {
              name: "SpaceFN",
              type: "variable_if",
              value: 0,
            },
          ],
          from: {
            modifiers: { optional: ["any"] },
            simultaneous: [{ key_code: "spacebar" }, { key_code: key }],
            simultaneous_options: {
              key_down_order: "strict",
              key_up_order: "strict_inverse",
              to_after_key_up: [
                {
                  set_variable: {
                    name: "SpaceFN",
                    value: 0,
                  },
                },
              ],
            },
          },
          parameters: { "basic.simultaneous_threshold_milliseconds": 500 },
          to: [
            {
              set_variable: {
                name: "SpaceFN",
                value: 1,
              },
            },
            ...to,
          ],
          type: "basic",
        },
        {
          conditions: [
            {
              name: "SpaceFN",
              type: "variable_if",
              value: 1,
            },
          ],
          from: {
            key_code: key,
            modifiers: { optional: ["any"] },
          },
          to,
          type: "basic",
        },
      ];
    })
    .flat(),
};

console.log(JSON.stringify(config, null, 2));
console.log(JSON.stringify(config));
