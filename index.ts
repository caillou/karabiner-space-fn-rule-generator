const keys = [
  { from: "i", to: "up_arrow" },
  { from: "j", to: "left_arrow" },
  { from: "k", to: "down_arrow" },
  { from: "l", to: "right_arrow" },
  { from: "h", to: "delete_or_backspace" },
  {
    from: "v",
    to: {
      key_code: "v",
      modifiers: ["left_control", "left_option"],
    },
  },
  {
    from: "u",
    to: {
      // Go to previous tab in most apps
      key_code: "open_bracket",
      modifiers: ["left_command", "left_shift"],
    },
  },
  {
    from: "o",
    to: {
      // Go to next tab in most apps
      key_code: "close_bracket",
      modifiers: ["left_command", "left_shift"],
    },
  },
] as const;

const config = {
  description: "SpaceFN",
  manipulators: keys
    .map(({ from, to: toValue }) => {
      const to =
        typeof toValue === "string" ? [{ key_code: toValue }] : [toValue];
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
            simultaneous: [{ key_code: "spacebar" }, { key_code: from }],
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
            key_code: from,
            modifiers: { optional: ["any"] },
          },
          to,
          type: "basic",
        },
      ];
    })
    .flat(),
};

// console.log(JSON.stringify(config, null, 2));
console.log(JSON.stringify(config));
